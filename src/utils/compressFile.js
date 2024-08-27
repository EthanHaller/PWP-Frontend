import Compressor from "compressorjs"
import { PDFDocument } from "pdf-lib"

const compressFile = (file, maxFileSize) => {
	return new Promise((resolve, reject) => {
		if (file.type.startsWith("image/")) {
			let quality = 0.7
			const attemptCompression = () => {
				new Compressor(file, {
					quality: quality,
					success(compressedResult) {
						if (compressedResult.size <= maxFileSize) {
							resolve(compressedResult)
						} else {
							if (quality > 0.1) {
								quality -= 0.1
								attemptCompression()
							} else {
								reject(new Error(`Cannot compress image within ${maxFileSize / (1024 * 1024)} MB limit.`))
							}
						}
					},
					error(err) {
						reject(err)
					},
				})
			}
			attemptCompression()
		} else {
			reject(new Error("Unsupported file type"))
		}
	})
}

export default compressFile
