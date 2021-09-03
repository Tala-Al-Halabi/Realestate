using Domain;
using FluentValidation;

namespace Application.Properties
{
    public class PropertyValidator : AbstractValidator<Property>
    {
        public PropertyValidator()
        {
            RuleFor(x => x.PType).NotEmpty();
            RuleFor(x => x.Location).NotEmpty();
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.About).NotEmpty();
            RuleFor(x => x.WhytoInvest).NotEmpty();
            RuleFor(x => x.IType).NotEmpty();
            RuleFor(x => x.Size).NotEmpty();
            RuleFor(x => x.Bathrooms).NotEmpty();
            RuleFor(x => x.Bedrooms).NotEmpty();
            RuleFor(x => x.price).NotEmpty();
            RuleFor(x => x.PricePersqm).NotEmpty();
            RuleFor(x => x.investnow).NotEmpty();
            RuleFor(x => x.PDate).NotEmpty();
            
        }
    }
}