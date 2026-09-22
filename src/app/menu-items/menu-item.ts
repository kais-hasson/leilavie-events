export interface MenuItem {
  //main
  id: string;
  title: string;
  route: string;
  sectionId?: string;
  type: 'link' | 'sub' | 'ext' | 'action';
  //sub
  subtitle?: string;
  icon?: string;
  disabled?: boolean;
}
