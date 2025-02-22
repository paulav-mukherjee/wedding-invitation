import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.scss' ],
})
export class AppComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParams.subscribe((params: any) => {


    });
  }


  songs: any = [
    {
      thumbnail: 'assets/img/section1/thumb1.png',
      Name: 'Do dil mil rahe hain',
      url: 'assets/img/section1/song1.mp3'
    },
    {
      thumbnail: 'assets/img/section1/thumb2.png',
      Name: 'Main Agar Kahoon',
      url: 'assets/img/section1/song2.mp3'
    },
    {
      thumbnail: 'assets/img/section1/thumb3.png',
      Name: 'Jogi',
      url: 'assets/img/section1/song3.mp3'
    }
  ];

  currentSongIndex: number = 0;
  currentSong = this.songs[ this.currentSongIndex ];
  isPlaying: boolean = false;
  defaultThumbnail: string = 'assets/img/section1/default-thumb.jpg'; // Default thumbnail

  // Play/Pause Toggle
  togglePlayPause() {
    const audioPlayer: any = document.querySelector('audio');
    if (this.isPlaying) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  // Next Song
  nextSong() {
    const audioPlayer: any = document.querySelector('audio');
    if (this.isPlaying) {
      audioPlayer.pause();
    }
    this.isPlaying = false;
    this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
    this.loadCurrentSong();
  }

  // Previous Song
  previousSong() {
    const audioPlayer: any = document.querySelector('audio');
    if (this.isPlaying) {
      audioPlayer.pause();
    }
    this.isPlaying = false;
    this.currentSongIndex = (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
    this.loadCurrentSong();
  }

  // Load Current Song and Update Thumbnail
  loadCurrentSong() {
    this.currentSong = this.songs[ this.currentSongIndex ];
    const audioPlayer: any = document.querySelector('audio');
    audioPlayer.load();
    
    audioPlayer.onended = () => {
      this.nextSong();
    };
    setTimeout(() => {
      audioPlayer.play();
      this.isPlaying = true;
    }, 200);
  }
}
