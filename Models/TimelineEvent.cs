namespace MeridianGroup.Models;

public class TimelineEvent
{
    public int    Id           { get; set; }
    public int    Year         { get; set; }
    public string Title        { get; set; } = string.Empty;
    public string Description  { get; set; } = string.Empty;
    public int    DisplayOrder { get; set; }
}
