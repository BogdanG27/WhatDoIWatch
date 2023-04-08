using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

public interface IStaffService
{
    public Task<ServiceResponse<StaffDTO>> GetStaff(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<StaffDTO>>> GetStaffs(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddStaff(StaffAddDTO staff, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateStaff(StaffUpdateDTO staff, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteStaff(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
}