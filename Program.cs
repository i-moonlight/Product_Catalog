using ProductCatalog;

var builder = WebApplication.CreateBuilder(args);
IConfiguration configuration;
// Add services to the container.
builder.Services.AddControllersWithViews();
var config = new ConfigurationBuilder()
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true);

configuration = config.Build();

builder.Services.ConfigureSqlContext(builder.Configuration);
builder.WebHost.UseKestrel(options =>
{
    var portVar = Environment.GetEnvironmentVariable("PORT");
    if (portVar is { Length: > 0 } && int.TryParse(portVar, out int port))
    {
        options.ListenAnyIP(port);
    }
    
});
var app = builder.Build();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var ctx = services.GetRequiredService<ProductCatalogDbContext>();
    ctx.Database.EnsureCreated();
    Seeder.Initialize(ctx);
}
catch (Exception e)
{
    Console.WriteLine("An error occurred while seeding the database: " + e.Message);
}
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();