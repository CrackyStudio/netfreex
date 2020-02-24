## Configuration

* Create a `.env` file and fill it like this
    ```
        FILES_BASE=/home/yourusername/Documents/netfreex/server/public
    ```
* Start a new terminal in this folder and run `npm install`
* In the same terminal, run `npm run dev`
* Add content (films, series, images) following this pattern :
```
server
└───public
│   └───images
│   │   └───films
│   │   │   └───divergent.jpg
│   │   │   └───terminator.jpg
│   │   │   └───...
│   │   └───series
│   │   │   └───game of thrones.jpg
│   │   │   └───vikings.jpg
│   │   │   └───...
│   └───videos
│   │   └───films
│   │   │   └───divergent.mp4
│   │   │   └───terminator.mp4
│   │   │   └───...
│   │   └───series
│   │   │   └───game of thrones
│   │   │   │   └───S01
│   │   │   │   │   └───E01.mp4
│   │   │   │   │   └───E02.mp4
│   │   │   │   │   └───...
│   │   │   │   └───S02
│   │   │   │   │   └───...
│   │   │   │   └───...
│   │   │   └───vikings
│   │   │   │   └───S01
│   │   │   │   │   └───E01.mp4
│   │   │   │   │   └───E02.mp4
│   │   │   │   │   └───...
│   │   │   │   └───S02
│   │   │   │   │   └───...
│   │   │   │   └───...
```

## Rules
- Video format must be .mp4 (h264-AAC)
- Images must be .jpg only
- Seasons name must be S01, S02, ... format
- Episodes name must be E01, E02, ... format