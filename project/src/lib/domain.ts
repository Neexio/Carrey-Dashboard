// Domain configuration and utilities
export const domainConfig = {
  main: 'carrey.ai',
  dashboard: 'dashboard.carrey.ai',
  
  // Get current domain type
  getCurrentDomain() {
    const hostname = window.location.hostname;
    if (hostname === this.dashboard) return 'dashboard';
    if (hostname === this.main) return 'main';
    return 'unknown';
  },

  // Check if current domain is dashboard
  isDashboard() {
    return this.getCurrentDomain() === 'dashboard';
  },

  // Get URL for other domain
  getOtherDomainUrl(path: string = '') {
    const currentDomain = this.getCurrentDomain();
    const targetDomain = currentDomain === 'dashboard' ? this.main : this.dashboard;
    const protocol = window.location.protocol;
    return `${protocol}//${targetDomain}${path}`;
  },

  // Handle domain-specific redirects
  handleRedirect(type: 'auth' | 'dashboard') {
    const currentDomain = this.getCurrentDomain();
    
    if (type === 'auth' && currentDomain === 'dashboard') {
      window.location.href = this.getOtherDomainUrl('/auth');
      return true;
    }
    
    if (type === 'dashboard' && currentDomain === 'main') {
      window.location.href = this.getOtherDomainUrl();
      return true;
    }
    
    return false;
  }
};