   M S B A M L   `   `   `  ����E  ADesktopApp, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null3clr-namespace:DesktopApp.PagesDesktopApp.Pages  5          DesktopApp.Pages.Page1   5      W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5      R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      0localclr-namespace:DesktopApp.Pages     5        N� Title$  Page1��5	      .��5      �  � ColumnDefinitions 5   
   �� 5      $��4* �6   �� 5      $��3* �6    � RowDefinitions 5   
   �� 5      $��2* �6   �� 5      $��1* �6   �� 5      $��1* �6   �� 5      $��1* �6   �� 5      $��2* �6   .+�5   
   �� $��0��6   $��5��6    $��../Images/hero-image.jpg��5   	   $
��Fill=�6+   �� 5   
   
�������$��1��6(   $��5��68   .+�5      �� 
������ $��0q�6/   $��0��6C   $��Create An Account��6P    �� 
IsReadOnly$
 True��6i   $
��Left=�6{   $��20(�6�   $��20,20q�5      .��6"   5      �� 5      
������ $��0��62   $��22,-15q�6?   �� 5       $�Already have an account? ��6    �� 5!      -   5        $��Pages/Page2.xaml?�5!      .�6\   .�5"      �� $�Log in��6   5#      5$      �� 5%      
������ $��0q�60   $��1��6D   $��	User name��6Q   $
 True��6b   $��	20,20,0,0q�6t   .��6�   5&      �� 5'      $	��300��6   
�������$��1q�64    �� CornerRadius$ 10��6H   ._�5(      �� -   5         ��Name$ UsernameTextBox��5(      
������ $��0q�6L   $
��Left=�6`   $��1��6{   $��20(�6�   $	��280��6�   $��30��6�   
�������$��10,0,0,0q�6�   5)      �� 5+      
������ $��0q�6/   $��2��6C   $��Email Address��6P   $
 True��6e   $��	20,20,0,0q�6w   .��6�   5,      �� 5-      $	��300��6   
�������$��1q�64   $ 10��6H   ._�5.      �� -   5        $ EmailBox��5.      
������ $��0q�6E   $
��Left=�6Y   $��1��6t   $��20(�6�   $	��280��6�   $��30��6�   
�������$��10,0,0,0q�6�   5/      �� 51      
������ $��0q�6/   $��3��6C   $��Password��6P   $
 True��6`   $��	20,20,0,0q�6r   .��6�   52      �� 53      $	��300��6   
�������$��1q�64   $ 10��6H   ._�54      G� -   5         G�Name$ PasswordBox��54      
������ $��0q�6L   $
��Left=�6`   $��2��6{   $��20(�6�   $	��280��6�   $��30��6�   
�������$��10,0,0,0q�6�   55      �� 56      
������ $��0q�6/   $��3��6C   $��8(�6P   $
 True��6]   $I��CUse 8 or more characters with a mix of letters, numbers and symbols��6o   $��20,0,0,0q�6�   .��6�   57      �� 59      -   5        $��4��59      $��30��5:      $��5,0,5,0q�5;      
���   �
�������$��Create an account��5?      $
��Left=�6O   $	��150��6j   $��	20,20,0,0q�6v   �� 5@      
������ $��4��61    �� Padding$
 20,5q�6>   �� 5A      $�Already have an account? ��6
    �� 5B      -   5        $��Pages/Page2.xaml?�5B      .�6[   .�5C   
   �� $�Log in��6   5D      5E      5G      5H      5I      