namespace MeridianGroup.Models;

public class Project
{
    public int     Id           { get; set; }
    public string  Title        { get; set; } = string.Empty;
    public string  Category     { get; set; } = string.Empty;
    public string  Description  { get; set; } = string.Empty;
    public string? ImageUrl     { get; set; }
    public string? VideoUrl     { get; set; }
    public string  StatsJson    { get; set; } = "[]";   // [{label, value, unit}]
    public string  GradientFrom { get; set; } = "#4F6EF7";
    public string  GradientTo   { get; set; } = "#1a1a3e";
    public int     DisplayOrder { get; set; }
    public bool    IsActive     { get; set; } = true;
}
