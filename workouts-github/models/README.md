# AI hold finder model

`holds.onnx` outlines climbing holds in a wall photo for the project and motion-tracking hold pickers.

- Model: Mask R-CNN (R50) climbing-hold instance segmentation from d12's crux-climbing-hold-segmentation-models.
- This file: the int8/fp16 ONNX conversion published at https://github.com/AEYohn/crux-models (release holds-v1).
- SHA-256: e61d3c1d0e6c3f96f935eaeba50183715a574db0a23f960d80782f4c9a0a5370
- Licence: MIT, see LICENSE-d12.

The app downloads it only when you ask for the AI hold finder, and keeps it on the phone for offline use.
