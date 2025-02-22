import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-link',
  templateUrl: './create-link.page.html',
  styleUrls: [ './create-link.page.scss' ],
})
export class CreateLinkPage implements OnInit {
  name: any = '';
  type: any = ''
  constructor() { }

  ngOnInit() {
  }

  shareNow() {
    if (this.name != '' && this.type != '') {
      const encodedName = encodeURIComponent(this.name);
      let link = `https://paulav-souravi-wedding.netlify.app/?name=${encodedName}&type=${this.type}`
      // (encode the link and share this link) code
      if (navigator.share) {
        navigator.share({
          title: 'Invitation Link',
          text: `You're invited! Check out the invitation here:`,
          url: link
        }).then(() => {
          console.log('Link shared successfully!');
        }).catch((error) => {
          console.error('Error sharing:', error);
        });
      } else {
        // Fallback: Copy to clipboard if Web Share API isn't supported
        navigator.clipboard.writeText(link).then(() => {
          alert('Invitation link copied to clipboard!');
        }).catch(err => {
          console.error('Could not copy text: ', err);
        });
      }
      this.name = ''
      this.type = ''
    }
  }
}
