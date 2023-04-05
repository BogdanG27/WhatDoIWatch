using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.Specifications;
public sealed class ActorSpec : BaseSpec<ActorSpec, Actor>
{
    public ActorSpec(Guid id) : base(id)
    {
    }
}