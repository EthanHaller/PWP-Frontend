import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
	return (
		<div className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg bg-foreground/10">
			<Skeleton className="w-full aspect-square object-cover bg-foreground/10" />
			<div className="p-4 bg-foreground/10">
				<Skeleton className="h-6 w-3/4 mb-2" />
				<Skeleton className="h-4 w-1/2 mb-2" />
			</div>
		</div>
	)
}
