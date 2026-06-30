using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MeridianGroup.Data;
using MeridianGroup.Models;

namespace MeridianGroup.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContentController(AppDbContext db, IConfiguration config) : ControllerBase
{
    // ── PUBLIC READ ENDPOINTS ──────────────────────────────────────────────

    [HttpGet("services")]
    public async Task<IActionResult> GetServices() =>
        Ok(await db.Services.Where(s => s.IsActive).OrderBy(s => s.DisplayOrder).ToListAsync());

    [HttpGet("projects")]
    public async Task<IActionResult> GetProjects() =>
        Ok(await db.Projects.Where(p => p.IsActive).OrderBy(p => p.DisplayOrder).ToListAsync());

    [HttpGet("team")]
    public async Task<IActionResult> GetTeam() =>
        Ok(await db.TeamMembers.Where(m => m.IsActive).OrderBy(m => m.DisplayOrder).ToListAsync());

    [HttpGet("timeline")]
    public async Task<IActionResult> GetTimeline() =>
        Ok(await db.TimelineEvents.OrderBy(e => e.DisplayOrder).ToListAsync());

    [HttpGet("settings")]
    public async Task<IActionResult> GetSettings() =>
        Ok(await db.SiteSettings.ToDictionaryAsync(s => s.Key, s => s.Value));

    // ── ADMIN WRITE ENDPOINTS (require AdminKey header) ────────────────────

    private bool IsAdmin() =>
        Request.Headers.TryGetValue("X-Admin-Key", out var key) && key == config["AdminKey"];

    // Services
    [HttpPost("services")]
    public async Task<IActionResult> CreateService([FromBody] Service s)
    {
        if (!IsAdmin()) return Unauthorized();
        db.Services.Add(s); await db.SaveChangesAsync(); return Ok(s);
    }

    [HttpPut("services/{id}")]
    public async Task<IActionResult> UpdateService(int id, [FromBody] Service dto)
    {
        if (!IsAdmin()) return Unauthorized();
        var svc = await db.Services.FindAsync(id);
        if (svc is null) return NotFound();
        svc.Icon = dto.Icon; svc.Title = dto.Title; svc.Description = dto.Description;
        svc.FeaturesJson = dto.FeaturesJson; svc.DisplayOrder = dto.DisplayOrder; svc.IsActive = dto.IsActive;
        await db.SaveChangesAsync(); return Ok(svc);
    }

    [HttpDelete("services/{id}")]
    public async Task<IActionResult> DeleteService(int id)
    {
        if (!IsAdmin()) return Unauthorized();
        var svc = await db.Services.FindAsync(id);
        if (svc is null) return NotFound();
        db.Services.Remove(svc); await db.SaveChangesAsync(); return NoContent();
    }

    // Projects
    [HttpPost("projects")]
    public async Task<IActionResult> CreateProject([FromBody] Project p)
    {
        if (!IsAdmin()) return Unauthorized();
        db.Projects.Add(p); await db.SaveChangesAsync(); return Ok(p);
    }

    [HttpPut("projects/{id}")]
    public async Task<IActionResult> UpdateProject(int id, [FromBody] Project dto)
    {
        if (!IsAdmin()) return Unauthorized();
        var proj = await db.Projects.FindAsync(id);
        if (proj is null) return NotFound();
        proj.Title = dto.Title; proj.Category = dto.Category; proj.Description = dto.Description;
        proj.StatsJson = dto.StatsJson; proj.GradientFrom = dto.GradientFrom; proj.GradientTo = dto.GradientTo;
        proj.DisplayOrder = dto.DisplayOrder; proj.IsActive = dto.IsActive;
        await db.SaveChangesAsync(); return Ok(proj);
    }

    [HttpDelete("projects/{id}")]
    public async Task<IActionResult> DeleteProject(int id)
    {
        if (!IsAdmin()) return Unauthorized();
        var proj = await db.Projects.FindAsync(id);
        if (proj is null) return NotFound();
        db.Projects.Remove(proj); await db.SaveChangesAsync(); return NoContent();
    }

    // Team
    [HttpPost("team")]
    public async Task<IActionResult> CreateMember([FromBody] TeamMember m)
    {
        if (!IsAdmin()) return Unauthorized();
        db.TeamMembers.Add(m); await db.SaveChangesAsync(); return Ok(m);
    }

    [HttpPut("team/{id}")]
    public async Task<IActionResult> UpdateMember(int id, [FromBody] TeamMember dto)
    {
        if (!IsAdmin()) return Unauthorized();
        var member = await db.TeamMembers.FindAsync(id);
        if (member is null) return NotFound();
        member.Name = dto.Name; member.JobTitle = dto.JobTitle; member.Bio = dto.Bio;
        member.Initials = dto.Initials; member.LinkedInUrl = dto.LinkedInUrl;
        member.GradientFrom = dto.GradientFrom; member.GradientTo = dto.GradientTo;
        member.DisplayOrder = dto.DisplayOrder; member.IsActive = dto.IsActive;
        await db.SaveChangesAsync(); return Ok(member);
    }

    [HttpDelete("team/{id}")]
    public async Task<IActionResult> DeleteMember(int id)
    {
        if (!IsAdmin()) return Unauthorized();
        var m = await db.TeamMembers.FindAsync(id);
        if (m is null) return NotFound();
        db.TeamMembers.Remove(m); await db.SaveChangesAsync(); return NoContent();
    }

    // Timeline
    [HttpPost("timeline")]
    public async Task<IActionResult> CreateEvent([FromBody] TimelineEvent e)
    {
        if (!IsAdmin()) return Unauthorized();
        db.TimelineEvents.Add(e); await db.SaveChangesAsync(); return Ok(e);
    }

    [HttpPut("timeline/{id}")]
    public async Task<IActionResult> UpdateEvent(int id, [FromBody] TimelineEvent dto)
    {
        if (!IsAdmin()) return Unauthorized();
        var ev = await db.TimelineEvents.FindAsync(id);
        if (ev is null) return NotFound();
        ev.Year = dto.Year; ev.Title = dto.Title; ev.Description = dto.Description;
        ev.DisplayOrder = dto.DisplayOrder;
        await db.SaveChangesAsync(); return Ok(ev);
    }

    [HttpDelete("timeline/{id}")]
    public async Task<IActionResult> DeleteEvent(int id)
    {
        if (!IsAdmin()) return Unauthorized();
        var ev = await db.TimelineEvents.FindAsync(id);
        if (ev is null) return NotFound();
        db.TimelineEvents.Remove(ev); await db.SaveChangesAsync(); return NoContent();
    }

    // Site settings
    [HttpPut("settings/{key}")]
    public async Task<IActionResult> UpdateSetting(string key, [FromBody] string value)
    {
        if (!IsAdmin()) return Unauthorized();
        var setting = await db.SiteSettings.FindAsync(key);
        if (setting is null) return NotFound();
        setting.Value = value; setting.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync(); return Ok(setting);
    }

    // Admin: read contact submissions
    [HttpGet("submissions")]
    public async Task<IActionResult> GetSubmissions()
    {
        if (!IsAdmin()) return Unauthorized();
        return Ok(await db.ContactSubmissions.OrderByDescending(s => s.SubmittedAt).ToListAsync());
    }

    [HttpPut("submissions/{id}/read")]
    public async Task<IActionResult> MarkRead(int id)
    {
        if (!IsAdmin()) return Unauthorized();
        var sub = await db.ContactSubmissions.FindAsync(id);
        if (sub is null) return NotFound();
        sub.IsRead = true; await db.SaveChangesAsync(); return Ok();
    }
}
