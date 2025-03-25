import {ChangeDetectorRef, Component, DestroyRef, inject, input, OnInit} from '@angular/core';
import {FileService} from '../../service/file.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-decorative-header',
  imports: [],
  templateUrl: './decorative-header.component.html',
  styleUrl: './decorative-header.component.scss'
})
export class DecorativeHeaderComponent implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef)
  private readonly fileService = inject(FileService);
  private readonly domSanitizer = inject(DomSanitizer);
  private readonly destroyRef = inject(DestroyRef);
  readonly svgUrl = input<string>('');
  svgContent: SafeHtml | null = null;

  ngOnInit(): void {
    if (this.svgUrl()) {
      this.fileService.loadFile(this.svgUrl())
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(svg => {
          this.svgContent = this.domSanitizer.bypassSecurityTrustHtml(svg);
          this.changeDetectorRef.markForCheck();
        });
    }
  }


}
