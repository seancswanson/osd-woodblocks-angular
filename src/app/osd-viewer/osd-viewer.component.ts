import { Component, NgZone, OnInit } from '@angular/core';
import * as OpenSeadragon from 'openseadragon';
import metadata from '../../assets/data/hokusai-metadata.json';

@Component({
  selector: 'app-osd-viewer',
  templateUrl: './osd-viewer.component.html',
  styleUrls: ['./osd-viewer.component.scss']
})
export class OsdViewerComponent implements OnInit {
  viewer: OpenSeadragon.Viewer | null = null;
  columns: number = 6;
  rows: number = 6;

  infoModalShown: boolean = false;

  constructor(private ngZone: NgZone) {

  }

  ngOnInit(): void {
    this.getMetadata();
    this.createOSDViewer();
  }

  private getMetadata() {
    console.log(metadata);
  }

  private createOSDViewer() {
    const hokusaiDziSet: string[] = [];

    for (let i = 1; i <= 36; i++) {
      let path = `../assets/tilesources/hokusai-${i}.dzi`;

      hokusaiDziSet.push(path);
    }

    const osdOptions: OpenSeadragon.Options = {
      id: 'openseadragon',
      prefixUrl: '../lib/openseadragon/images/',
      tileSources: hokusaiDziSet,
      showNavigator: false,
      defaultZoomLevel: 0,
      minZoomImageRatio: 1,
      maxZoomPixelRatio: 4,
      zoomInButton: 'osd-zoom-in-button',
      zoomOutButton: 'osd-zoom-out-button',
      fullPageButton: 'osd-full-screen-button',
      homeButton: 'osd-home-button',
      // homeFillsViewer: true,
      visibilityRatio: 0.2,
      gestureSettingsMouse: {
        dblClickToZoom: true,
        clickToZoom: true
      },
      placeholderFillStyle: 'rgba(0, 0, 0, 0.2)'
    }

    this.viewer = this.ngZone.runOutsideAngular(() =>
      OpenSeadragon(osdOptions)
    );

    this.viewer.addHandler('open', () => {
      if (this.viewer) {
        this.arrangeImages();
        // this.createOSDOverlays();
        let oldBounds = this.viewer.viewport.getBounds();
        let newBounds = new OpenSeadragon.Rect(
          -0.25,
          0.2,
          2,
          oldBounds.height / oldBounds.width
        );
        this.viewer.viewport.fitBounds(newBounds, true);
      }
    });
  }

  private arrangeImages(): void {
    if (this.viewer) {
      const count = this.viewer.world.getItemCount();
      let i, bounds, tiledImage;
      let width = 0;
      let height = 0;
      let gap = 0.5;
      let x = 0;
      let y = 0;
      let column = 0;
      let row = 0;

      // Iterate through the images
      for (i = 0; i < count; i++) {
        // Get contextual information on image[i]
        // Width and height to set the dimensions in the world:
        // - Must be collected because each image has a different width/height
        // -- Otherwise there could be overlap
        tiledImage = this.viewer.world.getItemAt(i);
        bounds = tiledImage.getBounds();

        // Sets width/height to its space in viewport coordinates
        width = bounds.width;
        height = bounds.height;

        // Sets top-left corner of each image starting with (0, 0):
        // - X and Y will be adjusted by the previous images bounds.width/height.
        let pos = new OpenSeadragon.Point(x, y);

        // Checks if the bounds width is greater than the bounds height
        // Logic used to set distance of images from each other related to the row they are on
        if (width > height) {
          // Sets the Y that that row of images will have. Further in the loop,
          // the width ends up greater than what the height bounds of the last set of rows were
          // then knocks the next images down further by the last y diff.
          pos.y += (1 - height) / 2;
        } else {
          // Sets the X that the images will be positioned at as the loop continues.
          // For every image until the last column, only the x is adjusted, otherwise,
          // the condition above dictates the next row to begin.
          pos.x += (1 - width) / 2;
        }

        // Actually moves that image to the calculated position
        tiledImage.setPosition(pos, true);

        // Gives the image it's position in our grid
        // tiledImage.hokusai = {
        //   column: column,
        //   row: row
        // };

        // Once the position has been set, it moves to the next column space
        column++;

        // Sets the x where the next image will go to the cumulative bounds.width
        // of the images before it plus the gap (margin).
        x += width + gap;

        // Checks if the image[i] has reached the final column
        if (i > 0 && i % this.columns === this.columns - 1) {
          // If it has, set the x back to the beginning column pos
          x = 0;
          // Beginning column counter over again.
          column = 0;
          // Sets the y so it starts where the next row should go, which is the
          // cumulative of bounds height of the images before it plus the gap (margin)
          y += height + gap;
          // Add to the row counter
          row++;
        }
      }
    }
  }

  public toggleInfoModal() {
    this.infoModalShown = !this.infoModalShown;
  }
}

