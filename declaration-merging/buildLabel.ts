function buildLabel(name: string): string{
    return buildLabel.prefix + name + buildLabel.suffix;
}
namespace buildLabel{
    export let suffix = "";
    export let prefix = "Hello, "
}

alert(buildLabel("Sam Smith"))