import { AfterViewInit, Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../service/api-service.service';
import { Globals } from '../globals';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: [ 'home.page.scss' ],
})
export class HomePage implements OnInit, DoCheck, AfterViewInit {
  section_tag: string = 'HPI'
  employee_id: string = ''
  employeeDetails: any = {}
  wedding_type = '';
  e_card_link: any = '';
  contact: any = 'xxxxxxxxxx';

  targetDate: Date = new Date('2025-03-03T23:59:59'); // Set your target date here
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  constructor(
    private Service: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private globals: Globals,
  ) {
    this.route.queryParams.subscribe((params: any) => {
      this.employee_id = params.employee_id
    })
  };

  ngOnInit() { }
  ionViewDidEnter() {
    this.startCountdown();
    $('#staticBackdrop').modal('show')
  }

  ngDoCheck(): void {
    this.wedding_type = localStorage.getItem('invitation_from') ? localStorage.getItem('invitation_from') : '';
    console.log("🚀 ~ HomePage ~ ngDoCheck ~ this.wedding_type:", this.wedding_type)

    if (this.wedding_type == 'wedding') {
      this.e_card_link = 'assets/img/section1/paulav_and_souravi_wedding_invitation.pdf'
      this.contact = '7003055308'

    } else if (this.wedding_type == 'reception') {
      this.e_card_link = 'assets/img/section1/paulav_and_souravi_reception_invitation.pdf'
      this.contact = '7001372698'
    }
  }

  ngAfterViewInit(): void {
    const audioElement: HTMLAudioElement | null = document.getElementById('bgMusic') as HTMLAudioElement;
    audioElement.volume = 0.3;
    audioElement.play();
    this.music_status = 'play';
  }

  isTimeLeft : boolean = true;
  startCountdown(): void { 
    const updateTime = () => {
      const now = new Date().getTime();
      const timeLeft = this.targetDate.getTime() - now;
  
      if (timeLeft >= 0) {
        this.isTimeLeft = true;
        // Countdown logic
        this.days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      } else {
        this.isTimeLeft = false;
        // Time exceeded logic (time past target)
        const timeExceeded = Math.abs(timeLeft);
        this.days = Math.floor(timeExceeded / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((timeExceeded % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((timeExceeded % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((timeExceeded % (1000 * 60)) / 1000);
      }
    };
  
    updateTime(); // Initialize countdown
    const intervalId = setInterval(updateTime, 1000);
  }

  music_status: string = 'play';

  musicControl() {
    // Get the audio element
    const audioElement: HTMLAudioElement | null = document.getElementById('bgMusic') as HTMLAudioElement;

    if (audioElement) {
      if (this.music_status === 'play') {
        // Pause the music
        audioElement.pause();
        this.music_status = 'pause';
      } else {
        // Play the music
        audioElement.play();
        this.music_status = 'play';
      }
    }
  }
}

