namespace MeridianGroup.Models;

public class Service
{
    public int    Id          { get; set; }
    public string Icon        { get; set; } = string.Empty;
    public string Title       { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string FeaturesJson{ get; set; } = "[]";   // JSON array of bullet strings
    public int    DisplayOrder{ get; set; }
    public bool   IsActive    { get; set; } = true;
}
