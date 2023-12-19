using System.ComponentModel.DataAnnotations.Schema;
using Domain.Enums;

namespace Domain.Entities;

public class Role
{
    public Role()
    {
        Users = new List<User>();
    }
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public RolesEnum RoleId { get; set; }
    public string? Name { get; set; } = null!;
    public List<User> Users { get; set; }
    
    
}