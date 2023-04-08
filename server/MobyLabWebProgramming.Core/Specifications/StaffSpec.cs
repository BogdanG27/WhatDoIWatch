using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.Specifications;
public sealed class StaffSpec : BaseSpec<StaffSpec, Staff>
{
    public StaffSpec(Guid id) : base(id)
    {
    }
}