namespace MeridianGroup.Models;

public class SiteSetting
{
    public string Key       { get; set; } = string.Empty;  // PK
    public string Value     { get; set; } = string.Empty;
    public string? Label    { get; set; }
    public string  Category { get; set; } = "General";
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
