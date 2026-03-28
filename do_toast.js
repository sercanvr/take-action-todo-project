const fs = require('fs');
let toastContent = \import { toast } from "sonner";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

// Basari (yesil)
function success(message, subText = "") {
  toast.success(message, {
    description: subText,
    icon: <CheckCircle className="text-emerald-500" size={20} strokeWidth={2.5} />
  });
}

// Uyari (sari / amber)
function warn(message, subText = "") {
  toast.warning(message, {
    description: subText,
    icon: <AlertTriangle className="text-amber-500" size={20} strokeWidth={2.5} />
  });
}

// Hata (kirmizi)
function error(message, subText = "") {
  toast.error(message, {
    description: subText,
    icon: <XCircle className="text-red-500" size={20} strokeWidth={2.5} />
  });
}

// Bilgi (mavi)
function info(message, subText = "") {
  toast.info(message, {
    description: subText,
    icon: <Info className="text-blue-500" size={20} strokeWidth={2.5} />
  });
}

export const showToast = { success, warn, error, info };
\;
fs.writeFileSync('src/lib/toast.js', toastContent);
console.log('done toast');
