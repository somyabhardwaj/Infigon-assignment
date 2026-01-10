'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
    message?: string;
    onRetry?: () => void;
}

export function ErrorState({message ='Something went wrong. Please try again.', onRetry}:ErrorStateProps){
   return (
       <div className='flex flex-col items-center justifycenter py-16 px-4'>
      <div className='bg-red-50 dark:bg-red-900/20 rounded-full p-4 mb-4'>
      <AlertCircle className='w-12 h-12 text-red-600 dark:text-red-400'/>
      </div>
      <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
        Oops!, something went wrong
      </h3>
      <p className='text-gray-900 dark:text-gray-400 text-center mb-6 max-w-md'>
        {message}
      </p>
      {
        onRetry && (
          <button 
          onClick={onRetry}
          className='flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium '
          >
            <RefreshCw className='w-5 h-5' />
            Try again
          </button>
        )
        }
    </div>
   )
}
