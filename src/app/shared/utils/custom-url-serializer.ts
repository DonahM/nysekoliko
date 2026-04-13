import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';

export class CustomUrlSerializer implements UrlSerializer {
  private defaultUrlSerializer: DefaultUrlSerializer = new DefaultUrlSerializer();

  parse(url: string): UrlTree {
    // Angular router passes the URL starting with /
    let path = url.replace(/^\//, '');

    // Check if the URL string has our obfuscated prefix
    if (path.startsWith('s-')) {
      try {
        const decoded = atob(path.substring(2));
        return this.defaultUrlSerializer.parse(decoded);
      } catch (e) {
        // Fallback to default if decoding fails
        return this.defaultUrlSerializer.parse(url);
      }
    }

    return this.defaultUrlSerializer.parse(url);
  }

  serialize(tree: UrlTree): string {
    const url = this.defaultUrlSerializer.serialize(tree);
    
    // Do not encode root path
    if (url === '/' || url === '') {
      return url;
    }
    
    try {
      const encoded = btoa(url);
      return `/s-${encoded}`;
    } catch (e) {
      return url;
    }
  }
}
