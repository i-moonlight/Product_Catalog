namespace Domain.Exceptions;

public class PasswordNullException: ArgumentNullException
{
    public PasswordNullException(string message): base(message)
    { }
}