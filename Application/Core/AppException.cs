namespace Application.Core
{
    public class AppException
    {
        private string v;

        public AppException(int statusCode, string v)
        {
            StatusCode = statusCode;
            this.v = v;
        }

        public AppException(int statusCode, string message, string details)
        {
            StatusCode = statusCode;
            Message = message;
            Details = details;
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
    }
}