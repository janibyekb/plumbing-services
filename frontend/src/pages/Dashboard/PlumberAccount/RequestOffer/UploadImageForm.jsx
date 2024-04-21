import { useRef, useState } from "react";
import { BsTrash } from "react-icons/bs";

export default function UploadImageForm({
  onNext,
  onPrevious,
  onFinish,
  isLastStep,
  loading,
}) {
  const [files, setFiles] = useState([]);

  const [stepData, setStepData] = useState({
    imgUrls: [],
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  console.log(stepData.imgUrls);

  const handleImageSubmit = async (e) => {
    if (files.length > 0 && files.length + stepData.imgUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        //const base64 = await convertToBase64(files[i]);
        // console.log(base64);
        //promises.push("http://localhost:9090/service-hub/files/phone.png");
        promises.push(files[i]);
      }

      console.log(promises);

      Promise.all(promises)
        .then((urls) => {
          setStepData({
            ...stepData,
            imgUrls: stepData.imgUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
          console.log(stepData.imgUrls);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setStepData({
      ...stepData,
      imgUrls: stepData.imgUrls.filter((_, i) => i !== index),
    });
  };

  const handleNext = (e) => {
    onNext(stepData, isLastStep);
  };
  return (
    <div>
      <div className="onboarding-flow-children">
        <h5 className="my-3">Upload the images of the service needed</h5>
        <div className="flex gap-2 mb-2">
          <input
            onChange={(e) => setFiles(e.target.files)}
            className="p-3 border border-gray-300 rounded w-full"
            type="file"
            id="images"
            accept="image/*"
            multiple
          />
          <button
            disabled={uploading}
            onClick={handleImageSubmit}
            className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
        <p className="text-red-700 text-sm">
          {imageUploadError && imageUploadError}
        </p>

        {stepData.imgUrls.length > 0 &&
          stepData.imgUrls.map((file, index) => (
            <div
              key={file.name} // Assuming file names are unique
              className="flex justify-between p-3 border rounded mb-2"
              style={{ height: "150px" }}
            >
              <img
                src={URL.createObjectURL(file)}
                alt="listing image"
                className=" rounded"
                style={{ maxWidth: "100%", maxHeight: "100%" }} // Ensuring the image fits within the container
              />
              <div className="flex flex-column justify-center">
                <button className="" onClick={() => handleRemoveImage(index)}>
                  <BsTrash size={30} />
                </button>
              </div>
            </div>
          ))}
      </div>

      <div className="flex justify-between">
        <span>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            onClick={onPrevious}
          >
            Previous
          </button>
        </span>

        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleNext}
          disabled={loading}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
