namespace Domain.Entities;

public class Comment: BaseEntity
{
    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public string Content { get; set; } = null!;
}