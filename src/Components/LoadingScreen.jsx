import React from "react";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {/* Logo */}
          <div className="mx-auto h-20 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg
              className="h-12 w-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>

          {/* Loading Animation */}
          <div className="mt-8">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Setting up your account...
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please wait while we prepare your personalized experience
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
              <span>Authentication verified</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-3 flex-shrink-0 animate-pulse"></div>
              <span>Loading your profile...</span>
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <div className="w-4 h-4 bg-gray-300 rounded-full mr-3 flex-shrink-0"></div>
              <span>Preparing dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
