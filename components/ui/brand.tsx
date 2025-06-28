"use client"

import Link from "next/link"
import { FC } from "react"

interface BrandProps {
  theme?: "dark" | "light"
  compact?: boolean
  showSlogan?: boolean
}

export const Brand: FC<BrandProps> = ({
  theme = "dark",
  compact = false,
  showSlogan = true
}) => {
  return (
    <Link
      className="flex cursor-pointer flex-col items-center hover:opacity-50"
      href="/"
      target={compact ? "_blank" : "_self"}
    >
      {/* SaintSal Logo */}
      <div className={`${compact ? "mb-2" : "mb-4"}`}>
        <img
          src="https://cdn.builder.io/api/v1/assets/d83998c6a81f466db4fb83ab90c7ba25/real_svt_logo-d03762?format=webp&width=800"
          alt="SaintSal Logo"
          width={compact ? 60 : 120}
          height={compact ? 60 : 120}
          className="drop-shadow-2xl"
        />
      </div>

      {/* Brand Name */}
      <div className="text-center">
        <h1
          className={`bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text ${compact ? "text-xl" : "text-3xl"} font-bold text-transparent drop-shadow-lg`}
        >
          SAINTSAL™
        </h1>

        {showSlogan && (
          <p
            className={`${compact ? "text-sm" : "text-lg"} font-medium text-yellow-400/80 mt-1`}
          >
            Cookin' Knowledge.
          </p>
        )}

        {!compact && (
          <div className="mt-3 text-center">
            <p className="text-gray-400 text-sm font-medium">
              AI-Powered Business Intelligence
            </p>
            <div className="flex items-center justify-center mt-2 space-x-2">
              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                Multi-Tenant SaaS
              </span>
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                Enterprise Ready
              </span>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
