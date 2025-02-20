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
  name: any = ''
  wedding_from: any = ''
  is_loading: boolean = true;
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
      if (params.type) {
        this.wedding_from = (params.type).toLowerCase()
        localStorage.setItem('invitation_from', (params.type).toLowerCase()) // wedding or reception
      } else {
        const weddingType = localStorage.getItem('invitation_from');
        if (weddingType) {
          this.wedding_from = weddingType;
        }
      }
      if (params.name) {
        this.name = params.name;
        localStorage.setItem('invitation_name', params.name);
        this.router.navigate([ 'home' ], { queryParams: {} });
      }

      else {
        const storedName = localStorage.getItem('invitation_name');
        if (storedName) {
          this.name = storedName;
        }
      }
    })
  };

  ngOnInit() { }
  ionViewDidEnter() {
    this.startCountdown();
    // $('#staticBackdrop').modal('show')

    setTimeout(() => {
      this.is_loading = false;
    }, 4000);
    setTimeout(() => {
      document.getElementById("cuple2").scrollIntoView({
        behavior: "smooth", // Smooth scrolling animation
        block: "start",     // Scroll to the start of the element
      });
    }, 7000);
    setTimeout(() => {
      document.getElementById("coupl3").scrollIntoView({
        behavior: "smooth", // Smooth scrolling animation
        block: "start",     // Scroll to the start of the element
      });
    }, 10000);
  }

  ngDoCheck(): void {
    this.wedding_type = localStorage.getItem('invitation_from') ? localStorage.getItem('invitation_from') : '';
    if (this.wedding_type == 'wedding') {
      this.e_card_link = 'assets/img/section1/paulav_and_souravi_wedding_invitation.pdf'
      this.contact = '7003055308'

    } else if (this.wedding_type == 'reception') {
      this.e_card_link = 'assets/img/section1/paulav_and_souravi_reception_invitation.pdf'
      this.contact = '7001372698'
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const audioElement: HTMLAudioElement | null = document.getElementById('bgMusic') as HTMLAudioElement;
      audioElement!.volume = 0.3;
      audioElement!.play();
      this.music_status = 'play';
    }, 4000);
  }

  isTimeLeft: boolean = true;
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

  gotoMap(type: any) {
    if (type == 'mpj') {
      window.open('https://maps.app.goo.gl/tF4UNQSiY7JtrVgL7', '_blank')
    } else if (type == 'hlr') {
      window.open('https://maps.app.goo.gl/QwJF41BH3FTwtjNK8', '_blank')
    }
  }
}

