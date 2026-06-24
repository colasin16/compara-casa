"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
	ChevronLeft,
	ChevronRight,
	GitCompareArrows,
	Home,
	LogOut,
	Menu,
	SlidersHorizontal,
	X,
	type LucideIcon,
} from "lucide-react";

import { signOut } from "@/app/auth/actions";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTranslations } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

type NavItem = {
	href: string;
	label: string;
	icon: LucideIcon;
	/** Extra path prefixes that should also mark this item active. */
	match?: string[];
};

export function DashboardShell({
	children,
	email,
	guestId,
}: {
	children: React.ReactNode;
	email?: string;
	guestId?: string;
}) {
	const t = useTranslations();
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	const items: NavItem[] = [
		{
			href: "/dashboard",
			label: t("header.houses"),
			icon: Home,
			match: ["/dashboard/houses"],
		},
		{
			href: "/dashboard/criteria",
			label: t("header.criteria"),
			icon: SlidersHorizontal,
		},
		{
			href: "/dashboard/compare",
			label: t("header.compare"),
			icon: GitCompareArrows,
		},
	];

	const accountLabel = email ?? t("header.guest", { id: guestId ?? "" });

	const isActive = (item: NavItem) => {
		if (pathname === item.href) return true;
		return (item.match ?? []).some((prefix) =>
			pathname.startsWith(`${prefix}/`),
		);
	};

	/**
	 * Renders the sidebar contents. When `isCollapsed` is true the sidebar shows
	 * an icon-only rail; this is only used on desktop. The mobile drawer always
	 * renders the full (expanded) version.
	 */
	const renderSidebar = (isCollapsed: boolean) => (
		<div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
			<div
				className={cn(
					"flex h-16 items-center gap-2",
					isCollapsed
						? "justify-center px-2"
						: "justify-between px-4",
				)}
			>
				<Link
					href="/dashboard"
					aria-label={t("common.brand")}
					className="flex items-center gap-2 font-heading text-base font-extrabold tracking-tight"
				>
					<span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-base">
						🏠
					</span>
					{isCollapsed ? null : t("common.brand")}
				</Link>
				{/* Close button — mobile drawer only */}
				<button
					type="button"
					aria-label={t("header.closeMenu")}
					onClick={() => setOpen(false)}
					className="grid size-9 place-items-center rounded-lg text-sidebar-foreground transition-colors hover:bg-sidebar-foreground/10 md:hidden"
				>
					<X className="size-5" />
				</button>
			</div>

			<nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
				{isCollapsed ? null : (
					<p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
						{t("header.navigation")}
					</p>
				)}
				{items.map((item) => {
					const Icon = item.icon;
					const active = isActive(item);
					return (
						<Link
							key={item.href}
							href={item.href}
							onClick={() => setOpen(false)}
							aria-current={active ? "page" : undefined}
							title={isCollapsed ? item.label : undefined}
							className={cn(
								"flex items-center gap-3 rounded-lg py-2 text-sm font-semibold transition-colors",
								isCollapsed ? "justify-center px-2" : "px-3",
								active
									? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
									: "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
							)}
						>
							<Icon className="size-4 shrink-0" />
							{isCollapsed ? null : item.label}
						</Link>
					);
				})}
			</nav>

			<div className="border-t border-sidebar-border px-3 py-4">
				{isCollapsed ? null : (
					<>
						<p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
							{t("header.account")}
						</p>
						<p
							title={accountLabel}
							className="truncate px-3 py-1 text-sm font-medium text-sidebar-foreground"
						>
							{accountLabel}
						</p>
						<div className="mt-2 flex items-center gap-1 px-1">
							<LanguageSwitcher />
							<ThemeToggle />
						</div>
					</>
				)}
				<form action={signOut} className={isCollapsed ? "" : "mt-2"}>
					<button
						type="submit"
						title={isCollapsed ? t("header.signOut") : undefined}
						className={cn(
							"flex w-full items-center gap-3 rounded-lg py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
							isCollapsed ? "justify-center px-2" : "px-3",
						)}
					>
						<LogOut className="size-4 shrink-0" />
						{isCollapsed ? null : t("header.signOut")}
					</button>
				</form>
			</div>
		</div>
	);

	return (
		<div className="flex min-h-screen flex-1">
			{/* Desktop sidebar */}
			<aside
				className={cn(
					"sticky top-0 hidden h-screen shrink-0 border-r border-sidebar-border transition-[width] duration-200 md:block",
					collapsed ? "w-16" : "w-64",
				)}
			>
				<div className="relative h-full">
					{renderSidebar(collapsed)}
					{/* Collapse / expand toggle */}
					<button
						type="button"
						aria-label={
							collapsed
								? t("header.expandSidebar")
								: t("header.collapseSidebar")
						}
						aria-expanded={!collapsed}
						title={
							collapsed
								? t("header.expandSidebar")
								: t("header.collapseSidebar")
						}
						onClick={() => setCollapsed((value) => !value)}
						className="absolute -right-3 top-12 z-10 hidden size-6 place-items-center rounded-full border border-sidebar-border bg-background text-muted-foreground shadow-sm transition-colors hover:text-foreground hover:cursor-pointer md:grid"
					>
						{collapsed ? (
							<ChevronRight className="size-3.5" />
						) : (
							<ChevronLeft className="size-3.5" />
						)}
					</button>
				</div>
			</aside>

			{/* Mobile drawer */}
			{open ? (
				<div className="fixed inset-0 z-50 md:hidden">
					<button
						type="button"
						aria-label={t("header.closeMenu")}
						tabIndex={-1}
						onClick={() => setOpen(false)}
						className="absolute inset-0 bg-foreground/40"
					/>
					<div className="absolute inset-y-0 left-0 w-64 max-w-[80%] border-r border-sidebar-border shadow-dropdown">
						{renderSidebar(false)}
					</div>
				</div>
			) : null}

			<div className="flex min-w-0 flex-1 flex-col">
				{/* Mobile top bar */}
				<header className="sticky top-0 z-40 flex h-16 items-center gap-2 border-b border-border/60 bg-background/80 px-4 backdrop-blur-md md:hidden">
					<button
						type="button"
						aria-label={t("header.openMenu")}
						aria-expanded={open}
						onClick={() => setOpen(true)}
						className="grid size-10 place-items-center rounded-lg text-foreground transition-colors hover:bg-muted-foreground/10"
					>
						<Menu className="size-5" />
					</button>
					<Link
						href="/dashboard"
						className="flex items-center gap-2 font-heading text-base font-extrabold tracking-tight"
					>
						<span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-base">
							🏠
						</span>
						{t("common.brand")}
					</Link>
				</header>

				<div className="flex flex-1 flex-col">{children}</div>
			</div>
		</div>
	);
}
