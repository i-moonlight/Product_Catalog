namespace Domain.Entities;

public class Comment: BaseEntity
{
    public Comment()
    {
        
    }
    
    public User User { get; set; } = null!;
    public int UserId { get; set; }
    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public string Content { get; set; } = null!;
}