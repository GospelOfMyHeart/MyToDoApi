using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MyToDoApi.Entities;

namespace MyToDoApi
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Startup));
           // services.AddControllersWithViews();
            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                builder =>
                {
                    //builder.WithOrigins("http://example.com",
                    //                    "http://www.contoso.com",
                    //                    "http://localhost:4200");
                    builder.AllowAnyMethod().AllowAnyOrigin().AllowAnyHeader();
                   // builder
                });
            });
            services.AddDbContext<TodoContext>(options => options.UseSqlServer(Configuration.GetConnectionString("TodoApiContext")));
            services.AddIdentity<ApplicationUser, IdentityRole>()
       .AddEntityFrameworkStores<ApplicationDbContext>()
       .AddDefaultTokenProviders();
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(MyAllowSpecificOrigins);


            app.UseAuthorization();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
