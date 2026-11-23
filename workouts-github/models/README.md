# On-device AI models

The app downloads these only when you ask for them, and keeps them on the phone for offline use.
They run in the browser with ONNX Runtime Web.

| File | What it does | Source | Licence |
|---|---|---|---|
| `holds-yolo.onnx` | Finds climbing holds and volumes in a wall photo | [samolego/yolo-holds](https://huggingface.co/samolego/yolo-holds) (YOLO26n fine-tune), exported to ONNX at 1024 px with end-to-end output | AGPL-3.0 |
| `sam-encoder.onnx`, `sam-decoder.onnx` | Traces the exact outline of each picked hold | [Xenova/slimsam-77-uniform](https://huggingface.co/Xenova/slimsam-77-uniform) (SlimSAM, quantized) | Apache-2.0 |
| `modnet.onnx` | Cuts the person out of a photo for "Subject in front" share images | [Xenova/modnet](https://huggingface.co/Xenova/modnet) (fp16) | Apache-2.0 |

yolo-holds is licensed under the GNU Affero General Public License v3.0 (https://www.gnu.org/licenses/agpl-3.0.html).
This app's full source code is public in this repository.
