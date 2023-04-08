using Ardalis.SmartEnum;
using Ardalis.SmartEnum.SystemTextJson;
using System.Text.Json.Serialization;

namespace MobyLabWebProgramming.Core.Enums;

/// <summary>
/// This is and example of a smart enum, you can modify it however you see fit.
/// Note that the class is decorated with a JsonConverter attribute so that it is properly serialized as a JSON.
/// </summary>
[JsonConverter(typeof(SmartEnumNameConverter<StaffTypeEnum, string>))]
public sealed class StaffTypeEnum : SmartEnum<StaffTypeEnum, string>
{
    public static readonly StaffTypeEnum Director = new(nameof(Director), "Director");
    public static readonly StaffTypeEnum Writer = new(nameof(Writer), "Writer");
    public static readonly StaffTypeEnum Producer = new(nameof(Producer), "Producer");

    private StaffTypeEnum(string name, string value) : base(name, value)
    {
    }
}
