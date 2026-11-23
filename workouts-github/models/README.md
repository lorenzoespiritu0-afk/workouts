# On-device AI models

The app downloads these only when you ask for them, and keeps them on the phone for offline use.
They run in the browser with ONNX Runtime Web, one at a time in a background worker that is shut down after each step, so the phone gets its memory back.

| File | What it does | Source | Licence |
|---|---|---|---|
| `holds-yolo.onnx` | Finds climbing holds and volumes in a wall photo | [samolego/yolo-holds](https://huggingface.co/samolego/yolo-holds) (YOLO26n fine-tune), exported to ONNX at 1024 px with end-to-end output | AGPL-3.0 |
| `nano-encoder.onnx` | Image encoder for tracing the exact outline of each picked hold (512 px, low memory) | [dragonSwing/nanosam](https://huggingface.co/dragonSwing/nanosam) (NanoSAM, PPHGNetV2-B1) | Apache-2.0 |
| `sam-box-decoder.onnx` | Turns a hold's box into its outline | [dragonSwing/nanosam](https://huggingface.co/dragonSwing/nanosam) (MobileSAM mask decoder) | Apache-2.0 |
| `modnet.onnx` | Cuts the person out of a photo for "Subject in front" share images | [Xenova/modnet](https://huggingface.co/Xenova/modnet) (fp16) | Apache-2.0 |

yolo-holds is licensed under the GNU Affero General Public License v3.0 (https://www.gnu.org/licenses/agpl-3.0.html).
This app's full source code is public in this repository.
