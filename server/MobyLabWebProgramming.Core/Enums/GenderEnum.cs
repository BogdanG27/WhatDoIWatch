using Ardalis.SmartEnum;
using Ardalis.SmartEnum.SystemTextJson;
using System.Text.Json.Serialization;

namespace MobyLabWebProgramming.Core.Enums;

/// <summary>
/// This is and example of a smart enum, you can modify it however you see fit.
/// Note that the class is decorated with a JsonConverter attribute so that it is properly serialized as a JSON.
/// </summary>
[JsonConverter(typeof(SmartEnumNameConverter<GenderEnum, string>))]
public sealed class GenderEnum : SmartEnum<GenderEnum, string>
{
    public static readonly GenderEnum Male = new(nameof(Male), "Admin");
    public static readonly GenderEnum Female = new(nameof(Female), "Personnel");

    private GenderEnum(string name, string value) : base(name, value)
    {
    }
}
