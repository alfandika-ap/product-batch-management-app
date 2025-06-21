import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CheckCircle,
  Clock,
  Download,
  Loader2,
  Play,
  XCircle,
  ChevronDown,
} from "lucide-react";
import { useParams } from "react-router";
import { useDownloadBatchZip, useGetBatchProgress } from "../hooks/use-batch";
import { useMemo } from "react";

function ButtonDownloadBatches() {
  const { batchId } = useParams();
  const { data: batchProgress, isLoading } = useGetBatchProgress({
    batchId: batchId ?? "",
  });
  const { mutate: downloadBatchZip, isPending: isDownloading } =
    useDownloadBatchZip({
      batchId: batchId ?? "",
    });

  const handleDownloadBatchZip = () => {
    downloadBatchZip();
    // downloadBatchZip({
    //   onSuccess: (data) => {
    //     const url = window.URL.createObjectURL(data);
    //     const a = document.createElement("a");
    //     a.href = url;
    //     a.download = "batch.zip";
    //     a.click();
    //     window.URL.revokeObjectURL(url);
    //   },
    // });
  };

  const progressData = batchProgress?.data?.data;
  const isCompleted = useMemo(() => {
    if (progressData?.isCompleted !== undefined)
      return progressData.isCompleted;
    return (
      progressData?.completed === progressData?.total &&
      !!progressData?.total &&
      progressData.total > 0
    );
  }, [progressData]);

  const progressPercentage =
    progressData?.progressPercentage ??
    (progressData?.total
      ? Math.round((progressData.completed / progressData.total) * 100)
      : 0);

  if (isLoading) {
    return <Skeleton className="h-32 w-full" />;
  }

  if (!isCompleted && progressData) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/30 hover:bg-blue-100 dark:hover:bg-blue-950/30 text-blue-700 dark:text-blue-300"
          >
            <Loader2 className="w-4 h-4 animate-spin text-blue-500 dark:text-blue-400 mr-2" />
            QR Generation Progress ({progressPercentage}%)
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-96 p-0" align="end" sideOffset={5}>
          <Card className="border-0 shadow-none">
            <CardHeader className="">
              <CardTitle className="text-lg flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-blue-500 dark:text-blue-400" />
                Batch QR Code Generation Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">
                    {progressPercentage}%
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-400 dark:to-green-400 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Status Details */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg">
                  <Clock className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">
                      {progressData.waiting}
                    </p>
                    <p className="text-xs text-muted-foreground">Waiting</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/30 rounded-lg">
                  <Play className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">
                      {progressData.active}
                    </p>
                    <p className="text-xs text-muted-foreground">Active</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">
                      {progressData.completed}
                    </p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg">
                  <XCircle className="w-4 h-4 text-red-500 dark:text-red-400" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">
                      {progressData.failed}
                    </p>
                    <p className="text-xs text-muted-foreground">Failed</p>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                  >
                    {progressData.totalInsert} of {progressData.qty}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    items generated
                  </span>
                </div>
              </div>

              {/* Note */}
              <div className="text-xs text-muted-foreground text-center p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-base">📋</span>
                  <span>
                    QR codes are being generated. You can download them once the
                    process is complete.
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      variant="outline"
      className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800/30 hover:bg-green-100 dark:hover:bg-green-950/30 text-green-700 dark:text-green-300"
      onClick={handleDownloadBatchZip}
    >
      <Download className="w-4 h-4 text-green-600 dark:text-green-400" />
      Download Batch QR Code
      {isDownloading && <Loader2 className="w-4 h-4 animate-spin" />}
    </Button>
  );
}

export default ButtonDownloadBatches;
