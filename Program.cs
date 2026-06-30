using Microsoft.EntityFrameworkCore;
using MeridianGroup.Data;

var builder = WebApplication.CreateBuilder(args);

// ── SERVICES ──────────────────────────────────────────────────────────────────
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Meridian Group CMS API", Version = "v1" });
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(opts =>
{
    opts.AddDefaultPolicy(policy => policy
        .WithOrigins(builder.Configuration["AllowedOrigins"]?.Split(',') ?? ["http://localhost:5000"])
        .AllowAnyHeader()
        .AllowAnyMethod());
});

// ── APP ───────────────────────────────────────────────────────────────────────
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Auto-apply migrations + seed on startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
    await SeedData.SeedAsync(db);
}

app.UseHttpsRedirection();
app.UseCors();
app.UseDefaultFiles();          // serves wwwroot/index.html for /
app.UseStaticFiles();           // serves wwwroot/**

app.UseAuthorization();
app.MapControllers();

// SPA fallback — send unknown paths to index.html
app.MapFallbackToFile("index.html");

app.Run();
