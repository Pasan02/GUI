   M S B A M L   `   `   `  ����E  ADesktopApp, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null3clr-namespace:DesktopApp.PagesDesktopApp.Pages  5          DesktopApp.Pages.Page7   5      W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5      R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      0localclr-namespace:DesktopApp.Pages     5        N� Title$  Page7��5	       � 	Resources 5       �� 
TargetType �� Property �� Value(  "System.Windows.Controls.DatePicker �� 	Resources��%  '��       '  
    '��     '�� �    �� 5   
   " ��6   .�5      ��  � ��$
 10,8q�6(   �� 5       � ��$ 0,5,0,15q�6'   �� 5       � ��$ 1q�60   �� 5       � �� �#E5E5E56,   �� 5       � ��$ 40��6'   �� 5       � ��$	 350��6)   5      �� 5   
   "  6   .�5      ��  � ��$
 10,8q�6(   �� 5       � ��$ 0,5,0,15q�6'   �� 5       � ��$ 1q�60   �� 5       � �� �#E5E5E56,   �� 5       � ��$ 40��6'   �� 5       � ��$	 350��6)   5      �� 5   
   " ��6   .�5       ��  � ��$
 10,8q�6(   �� 5!       � ��$ 0,5,0,15q�6'   �� 5"       � ��$ 1q�60   �� 5#       � �� �#E5E5E56,   �� 5$       � ��$ 40��6'   5%      �� 5'   
   " ��6   .�5(      ��  � ��$ 20,10q�6(   �� 5)       � �� �#2563EB6+   �� 5*       � ��
 �����6+   �� 5+       � ��$ 0q�60   �� 5,       � ��$ Right=�64    5-      ���� 5.      '��       " ��6   .�5/      ��  �@��CornerRadius$ 6��65   50      51      52      53      .��55      � 
������� � ColumnDefinitions 56   
   �� 57      $��* �6   �� 58      $
��Auto �6   �� 59      $��* �6   .+�5=   
   � $��1��6   $	��350��6   $��20q�6+    � RowDefinitions 5>      �� 5?      $
��Auto �6    �� 5@      $��* �6    �� 5A      $
��Auto �6    .+�5D      �� $��Plan a New Trip��6   $��24(�5E      $
��Bold"�5F      $��0,0,0,20q�5G      $��Center=�5H      �� 5J      $��1��6   .+�5K      �� $��Enter Trip Name��6   ���#4B55635L      �� 5M      -   5         ��Name$ TripNameTextBox��5M      �� 5O      $��
Start Date��6   ���#4B55635P        5Q      -   5        	  Name$	 StartDatePicker��5Q      �� 5S      $��End Date��6   ���#4B55635T        5U      -   5        $	 EndDatePicker��5U      �� 5W      $��	Trip Cost��6   ���#4B55635X      � 5Y       5Z      �� 5[      $��* �6+   �� 5\      $	��100 �6+   .+�5_      �� -   5        $ CostTextBox��5_      $��0��5`      $��	0,5,10,15q�5a      �� 5c      -   5        
 ��Name$
 CurrencyComboBox��5c      $��1��5d       �� SelectedIndex$ 0��5e      .@�5f      �� $	��USD��6'   �� 5g      $	��EUR��6'   �� 5h      $	��GBP��6'   5i      5j      5k      �� 5m      $��2��6    �� Orientation$ 
Horizontal=�6&   $��Right=�6?   .+�5n      �� -   5         ��Name$ CancelButton��5n      .��5o      �� $ 
Horizontal=�6!   .+�5p      �� $��Cancel��6$   $��5,0,0,0q�62   $��Center=�6C   5q      5r      �� 5s      -   5        $ AddActivitiesButton��5s      $��10,0,0,0q�6X   .��5t      �� $ 
Horizontal=�6!   .+�5u      �� $��Add Activities��6$   $��5,0,0,0q�6:   $��Center=�6K   5v      5w      �� 5x      -   5        $ SaveTripButton��5x      $��10,0,0,0q�6O   .��5y      �� $ 
Horizontal=�6!   .+�5z      �� $��	Save Trip��6$   $��5,0,0,0q�65   $��Center=�6F   5{      5|      5}      5~      5      5�      