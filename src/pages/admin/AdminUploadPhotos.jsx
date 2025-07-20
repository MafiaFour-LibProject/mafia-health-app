import { useState } from "react";
import { toast } from "react-toastify";
import { uploadFacilityPhotos } from "../../services/serviceService";
import { ImagePlus, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const AdminUploadPhotos = ({ facilityId, onClose }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const validFiles = files.filter((file) => {
      const type = file.type.toLowerCase();
      return type === "image/png" || type === "image/jpeg";
    });

    if (validFiles.length > 10) {
      toast.error("You can upload a maximum of 10 images.");
      return;
    }

    setSelectedFiles(validFiles);
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      const response = await uploadFacilityPhotos(facilityId, selectedFiles);
      console.log("Upload response:", response.data);

      if (response.data.success) {
        toast.success("Photos uploaded successfully!");
        onClose();
      } else {
        toast.error("Upload failed. Please try again.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Failed to upload photos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-6 space-y-4 text-sm text-gray-700"
    >
      <h2 className="text-lg font-semibold text-green-700 flex items-center gap-2">
        <ImagePlus size={20} /> Upload Facility Photos
      </h2>

      <input
        type="file"
        accept="image/png, image/jpeg"
        multiple
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-600"
      />

      {selectedFiles.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mt-2">
          {selectedFiles.map((file, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(file)}
              alt={`Preview ${idx}`}
              className="h-24 w-full object-cover rounded shadow"
            />
          ))}
        </div>
      )}

      <div className="flex justify-end pt-4 gap-2">
        <button
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
        >
          Cancel
        </button>
        <button
          onClick={handleUpload}
          disabled={loading}
          className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2 text-sm"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-4 w-4" /> Uploading...
            </>
          ) : (
            <>
              <ImagePlus size={16} /> Upload
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default AdminUploadPhotos;
