"use client";

export function TeamSwitcher({
  team,
}: {
  team: {
    name: string;
    logoUrl: string;
    plan: string;
  };
}) {
  return (
    <div className="flex items-center gap-2 mt-3">
      <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
        <img src={team.logoUrl} alt={team.name} className="size-4" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{team.name}</span>
        <span className="truncate text-xs">{team.plan}</span>
      </div>
    </div>
  );
}
