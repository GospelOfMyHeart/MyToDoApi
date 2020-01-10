using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using MyToDoApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyToDoApi.Entities
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options)
        {

        }
        public DbSet<Todo> Todos { get; set; }
    }
}
