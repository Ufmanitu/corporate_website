using MeridianGroup.Models;
using Microsoft.EntityFrameworkCore;

namespace MeridianGroup.Data;

public static class SeedData
{
    public static async Task SeedAsync(AppDbContext db)
    {
        if (!await db.Services.AnyAsync())
        {
            db.Services.AddRange(
                new Service { Icon = "◈", Title = "Corporate Strategy",       Description = "Transforming organizational vision into executable advantage through rigorous analysis and bold thinking.", FeaturesJson = "[\"Market entry & expansion\",\"Portfolio optimization\",\"M&A strategy & integration\",\"Operating model design\"]",    DisplayOrder = 1 },
                new Service { Icon = "⬡", Title = "Technology & AI",          Description = "Harnessing emerging technologies to drive efficiency, unlock new revenue streams, and future-proof operations.",   FeaturesJson = "[\"AI & machine learning\",\"Cloud architecture\",\"Platform engineering\",\"Data strategy\"]",                    DisplayOrder = 2 },
                new Service { Icon = "◉", Title = "Digital Transformation",   Description = "End-to-end reinvention of customer experience and operational models for the digital age.",                       FeaturesJson = "[\"Customer journey redesign\",\"Process automation\",\"Product strategy\",\"Innovation programs\"]",            DisplayOrder = 3 },
                new Service { Icon = "◬", Title = "Financial Advisory",       Description = "Capital markets expertise combined with strategic insight to maximize value at every stage of growth.",            FeaturesJson = "[\"Valuation & due diligence\",\"Capital structure optimization\",\"Financial modeling\",\"Investor relations\"]", DisplayOrder = 4 }
            );
        }

        if (!await db.Projects.AnyAsync())
        {
            db.Projects.AddRange(
                new Project { Title = "Apex Financial — Digital Core Transformation",  Category = "Financial Services", Description = "Full-stack modernization of a $40B AUM wealth management platform, delivering 340% ROI through AI-powered client intelligence.", StatsJson = "[{\"value\":\"340\",\"unit\":\"%\",\"label\":\"ROI\"},{\"value\":\"18\",\"unit\":\"mo\",\"label\":\"delivery\"}]", GradientFrom = "#4F6EF7", GradientTo = "#1a1a3e", DisplayOrder = 1 },
                new Project { Title = "Nordvale Health — Pan-APAC Operating Model",    Category = "Healthcare",         Description = "Redesigned operating model for a 12-country hospital network, achieving 67% reduction in administrative overhead.",            StatsJson = "[{\"value\":\"67\",\"unit\":\"%\",\"label\":\"cost reduction\"},{\"value\":\"12\",\"unit\":\"\",\"label\":\"countries\"}]",  GradientFrom = "#8B5CF6", GradientTo = "#1a0d3e", DisplayOrder = 2 },
                new Project { Title = "Sienna Logistics — AI Supply Chain",            Category = "Technology & Logistics", Description = "Deployed proprietary AI logistics engine across 3 continents, generating $2.1B in new revenue.",                          StatsJson = "[{\"value\":\"2.1\",\"unit\":\"B\",\"label\":\"new revenue\"},{\"value\":\"3\",\"unit\":\"\",\"label\":\"continents\"}]",     GradientFrom = "#06B6D4", GradientTo = "#003344",  DisplayOrder = 3 }
            );
        }

        if (!await db.TeamMembers.AnyAsync())
        {
            db.TeamMembers.AddRange(
                new TeamMember { Name = "Elena Kovacs",  JobTitle = "Managing Partner, Strategy",    Bio = "20 years in strategy consulting. Former McKinsey Senior Partner. Led $15B+ in M&A transactions across 6 sectors.",                               Initials = "EK", GradientFrom = "#4F6EF7", GradientTo = "#8B5CF6", DisplayOrder = 1 },
                new TeamMember { Name = "Marcus Reid",   JobTitle = "Managing Partner, Technology",  Bio = "Ex-Google AI Research. Pioneer in enterprise AI deployment. 3 patents in machine learning architecture and optimization.",                       Initials = "MR", GradientFrom = "#8B5CF6", GradientTo = "#06B6D4", DisplayOrder = 2 },
                new TeamMember { Name = "Amara Osei",    JobTitle = "Managing Partner, Finance",     Bio = "Former Goldman Sachs Managing Director. Specialist in cross-border transactions and emerging market capital structures.",                         Initials = "AO", GradientFrom = "#06B6D4", GradientTo = "#4F6EF7", DisplayOrder = 3 },
                new TeamMember { Name = "Sofia Lund",    JobTitle = "Chief Operating Officer",       Bio = "Built Meridian's operational backbone from 12 to 300 people. Expert in scaling professional services organizations globally.",                   Initials = "SL", GradientFrom = "#EC4899", GradientTo = "#8B5CF6", DisplayOrder = 4 }
            );
        }

        if (!await db.TimelineEvents.AnyAsync())
        {
            db.TimelineEvents.AddRange(
                new TimelineEvent { Year = 2008, Title = "Founded in New York",         Description = "Three former McKinsey partners launch Meridian with a mandate to make enterprise-grade strategy accessible to ambitious organizations.",         DisplayOrder = 1 },
                new TimelineEvent { Year = 2012, Title = "First Billion in Value",      Description = "Cross $1B in cumulative client value created. Open London office to serve the European financial services sector.",                               DisplayOrder = 2 },
                new TimelineEvent { Year = 2016, Title = "Technology Practice Launch",  Description = "Establish dedicated technology & digital transformation practice. Hire 40 engineers, data scientists, and AI specialists.",                       DisplayOrder = 3 },
                new TimelineEvent { Year = 2019, Title = "Asia-Pacific Expansion",      Description = "Open Singapore hub. Secure landmark engagement with Nordvale Health for pan-APAC digital transformation across 12 countries.",                     DisplayOrder = 4 },
                new TimelineEvent { Year = 2022, Title = "AI-First Pivot",              Description = "Launch Meridian Intelligence division. Deploy AI-native frameworks across all practice areas. 200+ clients now AI-augmented.",                     DisplayOrder = 5 },
                new TimelineEvent { Year = 2024, Title = "$4.2B Value Milestone",       Description = "Cumulative client value created surpasses $4.2 billion. Recognized as one of the world's top 10 boutique strategy firms by Financial Times.",     DisplayOrder = 6 }
            );
        }

        if (!await db.SiteSettings.AnyAsync())
        {
            db.SiteSettings.AddRange(
                new SiteSetting { Key = "hero.title.line1",   Value = "Navigate",          Label = "Hero Title Line 1", Category = "Hero" },
                new SiteSetting { Key = "hero.title.line2",   Value = "What's",            Label = "Hero Title Line 2", Category = "Hero" },
                new SiteSetting { Key = "hero.title.line3",   Value = "Next.",             Label = "Hero Title Line 3", Category = "Hero" },
                new SiteSetting { Key = "hero.subtitle",      Value = "We help ambitious organizations define clear strategy, harness technology, and execute with conviction.", Label = "Hero Subtitle", Category = "Hero" },
                new SiteSetting { Key = "hero.cta1",          Value = "Explore Our Work",  Label = "Hero CTA 1",        Category = "Hero" },
                new SiteSetting { Key = "hero.cta2",          Value = "Schedule a Call",   Label = "Hero CTA 2",        Category = "Hero" },
                new SiteSetting { Key = "stats.clients",      Value = "200",               Label = "Clients stat",      Category = "Stats" },
                new SiteSetting { Key = "stats.countries",    Value = "15",                Label = "Countries stat",    Category = "Stats" },
                new SiteSetting { Key = "stats.value",        Value = "4",                 Label = "Value stat ($B)",   Category = "Stats" },
                new SiteSetting { Key = "stats.retention",    Value = "97",                Label = "Retention stat (%)",Category = "Stats" }
            );
        }

        await db.SaveChangesAsync();
    }
}
