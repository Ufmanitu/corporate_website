namespace MeridianGroup.Models;

public class TeamMember
{
    public int     Id           { get; set; }
    public string  Name         { get; set; } = string.Empty;
    public string  JobTitle     { get; set; } = string.Empty;
    public string  Bio          { get; set; } = string.Empty;
    public string  Initials     { get; set; } = string.Empty;
    public string  GradientFrom { get; set; } = "#4F6EF7";
    public string  GradientTo   { get; set; } = "#8B5CF6";
    public string? LinkedInUrl  { get; set; }
    public string? ImageUrl     { get; set; }
    public int     DisplayOrder { get; set; }
    public bool    IsActive     { get; set; } = true;
}
