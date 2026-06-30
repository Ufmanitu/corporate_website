using Microsoft.AspNetCore.Mvc;
using MeridianGroup.Data;
using MeridianGroup.Models;
using System.ComponentModel.DataAnnotations;

namespace MeridianGroup.Controllers;

public record ContactRequest(
    [Required, MaxLength(200)] string Name,
    [Required, EmailAddress, MaxLength(200)] string Email,
    [MaxLength(200)] string? Company,
    [Required, MaxLength(5000)] string Message
);

[ApiController]
[Route("api/[controller]")]
public class ContactController(AppDbContext db) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Submit([FromBody] ContactRequest req)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // Rate-limit: max 3 submissions per email per hour
        var cutoff = DateTime.UtcNow.AddHours(-1);
        var recent = await db.ContactSubmissions
            .Where(s => s.Email == req.Email && s.SubmittedAt > cutoff)
            .CountAsync();
        if (recent >= 3)
            return StatusCode(429, new { error = "Too many submissions. Please try again later." });

        var submission = new ContactSubmission
        {
            Name    = req.Name,
            Email   = req.Email,
            Company = req.Company,
            Message = req.Message,
        };

        db.ContactSubmissions.Add(submission);
        await db.SaveChangesAsync();

        // TODO: Send notification email via SendGrid/SMTP
        // await emailService.SendAsync("hello@meridiangroup.com", "New inquiry", ...);

        return Ok(new { success = true, message = "Thank you! We'll be in touch within 24 hours." });
    }
}
