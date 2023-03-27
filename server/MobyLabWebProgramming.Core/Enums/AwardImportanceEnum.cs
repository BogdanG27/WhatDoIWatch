using Ardalis.SmartEnum;
using Ardalis.SmartEnum.SystemTextJson;
using System.Text.Json.Serialization;

namespace MobyLabWebProgramming.Core.Enums;

[JsonConverter(typeof(SmartEnumNameConverter<AwardImportanceEnum, string>))]
public sealed class AwardImportanceEnum : SmartEnum<AwardImportanceEnum, string>
{
    public static readonly AwardImportanceEnum High = new(nameof(High), "High");
    public static readonly AwardImportanceEnum Medium = new(nameof(Medium), Medium);
    public static readonly AwardImportanceEnum Low = new(nameof(Low), "Low");

    public AwardImportanceEnum(string name, string value) : base(name, value) { }
}
