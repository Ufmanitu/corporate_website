using Microsoft.EntityFrameworkCore;
using MeridianGroup.Models;

namespace MeridianGroup.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Service>           Services           => Set<Service>();
    public DbSet<Project>           Projects           => Set<Project>();
    public DbSet<TeamMember>        TeamMembers        => Set<TeamMember>();
    public DbSet<TimelineEvent>     TimelineEvents     => Set<TimelineEvent>();
    public DbSet<ContactSubmission> ContactSubmissions => Set<ContactSubmission>();
    public DbSet<SiteSetting>       SiteSettings       => Set<SiteSetting>();

    protected override void OnModelCreating(ModelBuilder mb)
    {
        mb.Entity<SiteSetting>().HasKey(s => s.Key);
    }
}
