import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface VerificationStatusProps {
  status: 'success' | 'error' | 'pending';
  message: string;
  email?: string;
}

export function VerificationStatus({ status, message, email }: VerificationStatusProps) {
  const router = useRouter();

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        router.push('/login');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, router]);

  const statusIcon = {
    success: <CheckCircle2 className="w-12 h-12 text-green-400" />,
    error: <XCircle className="w-12 h-12 text-red-400" />,
    pending: <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
  }[status];

  return (
    <Card className="w-full max-w-md bg-slate-900/50 backdrop-blur-sm border border-slate-700">
      <CardHeader className="flex flex-col items-center space-y-4">
        {statusIcon}
        <CardTitle className={`text-2xl font-bold ${
          status === 'success' ? 'text-green-400' : 
          status === 'error' ? 'text-red-400' : 
          'text-blue-400'
        }`}>
          {status === 'success' ? 'Verification Successful' : 
           status === 'error' ? 'Verification Failed' : 
           'Verifying Email'}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-slate-200">{message}</p>
        {email && (
          <p className="text-sm text-slate-400">
            Email: {email}
          </p>
        )}
        {status === 'success' && (
          <div className="text-sm text-slate-400 mt-2">
            <p>Redirecting to login page...</p>
            <div className="mt-2 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 animate-progress"></div>
            </div>
          </div>
        )}
        {status === 'error' && (
          <button
            onClick={() => router.back()}
            className="text-sm text-purple-400 hover:text-purple-300 underline"
          >
            Go back and try again
          </button>
        )}
      </CardContent>
    </Card>
  );
}