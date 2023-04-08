using System.Net;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Core.Specifications;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;

namespace MobyLabWebProgramming.Infrastructure.Services.Implementations;

public class StaffService : IStaffService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;

    public StaffService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }

    public async Task<ServiceResponse<StaffDTO>> GetStaff(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new StaffProjectionSpec(id), cancellationToken);

        return result != null ?
            ServiceResponse<StaffDTO>.ForSuccess(result) :
            ServiceResponse<StaffDTO>.FromError(new(HttpStatusCode.Forbidden, "Staff not found!", ErrorCodes.NotFound));
    }

    public async Task<ServiceResponse> AddStaff(StaffAddDTO staff, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add staffs!", ErrorCodes.CannotAdd));
        }

        var result = await _repository.GetAsync(new StaffProjectionSpec(staff.FirstName, staff.LastName), cancellationToken);
        if (result != null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Staff already exists!", ErrorCodes.CannotAdd));
        }

        await _repository.AddAsync(new Staff
        {
            Birthdate = staff.Birthdate,
            FirstName = staff.FirstName,
            LastName = staff.LastName,
            Gender = staff.Gender,
            Type = staff.Type,
        });

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse<PagedResponse<StaffDTO>>> GetStaffs(PaginationSearchQueryParams pagination, CancellationToken cancellationToken)
    {
        var result = await _repository.PageAsync(pagination, new StaffProjectionSpec(pagination.Search), cancellationToken);

        return ServiceResponse<PagedResponse<StaffDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse> UpdateStaff(StaffUpdateDTO staff, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin update the staff!", ErrorCodes.CannotUpdate));
        }

        var entity = await _repository.GetAsync(new StaffSpec(staff.Id), cancellationToken);

        if (entity != null)
        {
            entity.LastName = staff.LastName ?? entity.LastName;
            entity.FirstName = staff.FirstName ?? entity.FirstName;
            entity.Birthdate = staff.Birthdate ?? entity.Birthdate;
            entity.Gender = staff.Gender ?? entity.Gender;
            entity.Type = staff.Type ?? entity.Type;
            await _repository.UpdateAsync(entity, cancellationToken);
        }

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteStaff(Guid id, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can delete a staff!", ErrorCodes.CannotDelete));
        }
        await _repository.DeleteAsync<Staff>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}
